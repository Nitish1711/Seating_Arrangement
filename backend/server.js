import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Login ######################################################################
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await pool.query(`SELECT * FROM employees WHERE email = $1`, [email]);
        if (!employee.rows[0]) {
            throw new Error('Invalid email or password');
        }
        const isValid = await bcrypt.compare(password, employee.rows[0].password);
        if (!isValid) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ employeeId: employee.rows[0].employee_id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        res.json({ token, employee: { employee_id: employee.rows[0].employee_id, email: employee.rows[0].email } });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Register ######################################################################
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { employeeId, mobileNumber, email, password, defaultShift, defaultZone } = req.body;
        const existingEmployee = await pool.query(`SELECT * FROM employees WHERE employee_id = $1`, [employeeId]);
        if (existingEmployee.rows[0]) {
            throw new Error('Employee ID already exists');
        }
        const hashedPassword = await hashPassword(password);
        const result = await pool.query(`INSERT INTO employees (employee_id, mobile_number, email, password, default_shift, default_zone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [employeeId, mobileNumber, email, hashedPassword, defaultShift, defaultZone]);
        res.json({ message: 'Employee registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /bookSeat: Book a seat
app.post('/bookSeat', async (req, res) => {
    const { seat_number, emp_id, email, contact_number } = req.body;

    try {
        // Check if the seat is already booked
        const existingSeat = await pool.query('SELECT * FROM seats WHERE seat_number = $1', [seat_number]);

        if (existingSeat.rows.length > 0 && existingSeat.rows[0].booked) {
            return res.status(400).json({ error: 'Seat already booked' });
        }

        // Insert the booking information into the database
        const newBooking = await pool.query(
            'INSERT INTO seats (seat_number, booked, emp_id, email, contact_number) VALUES ($1, true, $2, $3, $4) RETURNING *',
            [seat_number, emp_id, email, contact_number]
        );

        res.status(201).json(newBooking.rows[0]);
    } catch (err) {
        console.error('Error booking seat:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /allSeats: Retrieve all seats with booked status
app.get('/allSeats', async (req, res) => {
    try {
        const allSeats = await pool.query('SELECT * FROM seats');
        res.json(allSeats.rows);
    } catch (err) {
        console.error('Error fetching seats:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

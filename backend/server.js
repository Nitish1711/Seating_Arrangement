import express from 'express';

const app = express();
const port = 3001;

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



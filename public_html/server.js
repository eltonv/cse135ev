const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('.'));
// Make the mongo db connection
app.use(cors({
  origin: 'https://collector.cse135ev.site'
}));
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://emvillal_db_user:7cPghd4Bje90QFUq@cse135.ojsfcha.mongodb.net/?retryWrites=true&w=majority&appName=cse135";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;

// (convert _id → string)
function normalize(doc) {
    if (!doc) return null;
    return { ...doc, _id: doc._id.toString() };


}

function createRoutes(collectionName) {
    const collection = () => db.collection(collectionName);
    
    // GET all 
    app.get(`/api/${collectionName}`, async (req, res) => {
        const data = await collection().find().toArray();
        const formatted = data.map(doc => {
            const normalized = normalize(doc);
function formatTimestamp(value) {
    if (!value || value === 0) return 'N/A';
    
    // If it's already a formatted string, return 
    if (typeof value === 'string' && value.includes('/')) {
        return value;
    }
    
    // If number format
    if (!isNaN(value)) {
        try {
            const date = new Date(parseInt(value));
            if (isNaN(date.getTime())) return 'N/A';
            return date.toLocaleString();
        } catch (e) {
            return 'N/A';
        }
    }
    
    return value; // Return 
}
            if (normalized.timestamp) {
                normalized.timestamp = formatTimestamp(normalized.timestamp);
            }
            if (normalized.loadStart) {
                normalized.loadStart = formatTimestamp(normalized.loadStart);
            }
            if (normalized.loadEnd) {
                normalized.loadEnd = formatTimestamp(normalized.loadEnd);
            }
            return normalized;
        });
        res.json(formatted);
    });
    
    // GET by ID 
    app.get(`/api/${collectionName}/:id`, async (req, res) => {
        const item = await collection().findOne({ _id: new ObjectId(req.params.id) });
        if (item) res.json(normalize(item));
        else res.status(404).json({ error: 'Not found' });
    });
    
    // POST 
    app.post(`/api/${collectionName}`, async (req, res) => {
        const result = await collection().insertOne(req.body);
        const inserted = await collection().findOne({ _id: result.insertedId });
        res.json(normalize(inserted));
    });
    
    // PUT 
    app.put(`/api/${collectionName}/:id`, async (req, res) => {
        const result = await collection().updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount) {
            const updated = await collection().findOne({ _id: new ObjectId(req.params.id) });
            res.json(normalize(updated));
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    });
    
    // DELETE 
    app.delete(`/api/${collectionName}/:id`, async (req, res) => {
        const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount) {
            res.json({ status: 'deleted', id: req.params.id });
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    });
}

// Create routes for static, performance, activity
['static', 'performance', 'activity','reading_behavior', 'reading_summary'].forEach(createRoutes);

app.get('/logger.php', (req, res) => {
    const { script, images } = req.query;
    if (script === 'off') console.log('JS disabled:', req.ip);
    if (images === 'enabled') console.log('Images enabled:', req.ip);
    if (images === 'disabled') console.log('Images disabled:', req.ip);

    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.set({
        'Content-Type': 'image/gif',
        'Content-Length': pixel.length,
        'Cache-Control': 'no-cache'
    });
    res.send(pixel);
});


//start the mongo server after
async function startServer() {
    try {
        await client.connect();
        db = client.db('analytics');
        console.log('Connected to MongoDB');


        app.listen(3000, () => console.log('Analytics server running on port 3000'));
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

startServer();

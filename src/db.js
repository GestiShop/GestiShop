const mongoose = window.require('mongoose')

mongoose.connect(process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose connected!') // FIXME: Call a callback
})
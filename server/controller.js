module.exports = {
    deleteTask: (req, res) => {
        let { key } = req.params
        let index = array.findIndex((task) => task.id === id)
        array.splice(index, 1)
    }
}
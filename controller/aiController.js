const suggestGoals = require("../ai/goalSuggester");

const getSuggestedGoals = async (req,res) => {
    const{previousGoals} = req.body;
    try{
        const suggestions = await suggestGoals(previousGoals);
        res.json({suggestions});
    } catch (err) {
        res.status(500).json({error: "AI suggestion failed"});
    }
};

module.exports = {getSuggestedGoals};
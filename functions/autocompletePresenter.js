exports = async (presenters) => {
    const collection = context.services.get("mongodb-atlas").db("events").collection("conference");
    return await collection
        .aggregate([
            {
                $search: {
                    autocomplete: {
                        path: "presenters",
                        query: presenters,
                        fuzzy: { maxEdits: 1 },
                    },
                },
            },
            {
                $project: {
                    presenters: 1,
                },
            },
            {
                $limit: 10,
            },
        ])
        .toArray();
};
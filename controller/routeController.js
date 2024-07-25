
export const getHomePage = (req, res) => {
    res.render('index.ejs');
};

export const getAddPage = (req, res) => {
    res.render("add.ejs");
};
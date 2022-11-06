const { default: axios } = require("axios");

/**   Search for a specific word      **/
exports.search = async (req, res, next) => {
    const result = await axios.get(
        `https://api.twitter.com/2/tweets?id=1582789260872388609`,
        {
            headers: {
              Authorization: "bearer AAAAAAAAAAAAAAAAAAAAAHtriAEAAAAAN0Cru%2FjlCxj%2FA4Ve1Ok%2FYHcAD2g%3DvFj27hodeSyWH4IIlOBBKT8hscD8t9LpwC5OMacusK9sWEZ8Zp",
            },
          }
      );
      console.log(result)
  res.status(200).json("result");
};

exports.callBackFunction=async (req, res, next)=>{
  res.send("callBack function")
}

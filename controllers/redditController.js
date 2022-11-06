const { default: axios } = require("axios");
const FormData = require("form-data");
/**   Search for a specific word      **/
exports.search = async (req, res, next) => {
  const q = req.body.q;
  const limit = req.body.limit;
  // q="Word to search for" limit="number of itmes to render"
  const result = await axios.get(
    `http://www.reddit.com/search.json?q=${q}&limit=${limit}`
  );
  const tmp = result.data.data.children;
  const posts = filter(tmp);
  console.log(posts);
  res.status(200).json(result.data);
};

function filter(data) {
  return data.map((item) => `http://www.reddit.com${item.data.permalink}`);
}

/**   Search for a specific Subreddit      **/
exports.searchSubReddit = async (req, res, next) => {
  const q = req.body.q;
  const limit = req.body.limit;
  const sub = req.body.sub;
  // q="Word to search for" limit="number of itmes to render"
  const result = await axios.get(
    `http://www.reddit.com/r/${sub}/search.json?q=${q}&restrict_sr=1&limit=${limit}`
  );
  const tmp = result.data.data.children;
  const posts = filter(tmp);
  console.log(posts);
  res.status(200).json(result.data);
};

exports.reddittoken = async (req, res, next) => {
  let url = req.url.split("?")[1].split("&");
  const state = url[0].split("=")[1];
  const code = url[1].split("=")[1];
  const result = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:5050/api/reddit/token`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.REACT_APP_REDDIT_CLIENT_ID,
        password: process.env.REACT_APP_REDDIT_CLIENT_SECRET,
      },
    }
  );
  res.status(200).json(result.data);
};

exports.redditRefresh_token = async (req, res, next) => {
  const result = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    `grant_type=refresh_token&refresh_token=685207795151-bZQ9lT_SHqED43OSYvm91DFX_qOESA`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.REACT_APP_REDDIT_CLIENT_ID,
        password: process.env.REACT_APP_REDDIT_CLIENT_SECRET,
      },
    }
  );
  res.status(200).json(result.data);
};

// for sending private message
exports.DM = async (req, res, next) => {
  const subject = req.body.subject;
  const to = req.body.to;
  const text = req.body.text;
  link = `https://oauth.reddit.com/api/compose?subject=${subject}&to=${to}&text=${text}`;
  const result = await axios.post(
    link,
    {},
    {
      headers: {
        Authorization: "bearer 685207795151-8-INF2qqNtuM7fwkFFwV0S_7bS2wtQ",
      },
    }
  );
  res.status(200).json(result.data);
};

exports.comments = async (req, res, next) => {
  const result = await axios.get(
    `http://oauth.reddit.com/comments/xtelhp?sort=old&threded=false`,
    {
      headers: {
        Authorization: "Bearer 685207795151-obn2-PMHn_MIO_W3DWbb1RRA80yt9w",
      },
    }
  );

  const comments = await getComments(result.data[1].data.children);
  res.status(200).json(comments);
};

const getComments = async (array) => {
  let h = [];
  await Promise.all(
    array.map(async (i) => {
      const result = await filterChildren(i);
      return h.push(result);
    })
  );
  const result = h.flat(1);
  return result;
};

async function filterChildren(element) {
  let cmt = [];
  if (element.kind === "t1") {
    if (element.data.replies === "") {
      cmt.push(element.data.author);
    } else {
      const tmp = await getComments(element.data.replies.data.children);
      const p = tmp.flat(1);
      cmt.push(p);
    }
  } else if (element.kind === "more") {
    element.data.children.map(async(i) => {
      console.log(i)
      //const t=await commentInfo(i);
      //console.log(t.data.children[0].data.author)
    });
    //cmt.push(element);
  }
  /*const urls = [];
    await Promise.all(
      element.data.children.map(async (i) => {
        return urls.push(`https://oauth.reddit.com/api/info?id=t1_${i}`);
      })
      
    ).then(async response=>{
      console.log(urls)
        await Promise.all(
        urls.map(async (url) => {
          await axios
            .get(url, {
              headers: {
                Authorization:
                  "Bearer 685207795151-obn2-PMHn_MIO_W3DWbb1RRA80yt9w",
              },
            })
            .then((data) => {
              console.log(data.data.data.children[0].data.author)
              cmt.push(data.data.data.children[0].data.author);
            });
        })
      )
    }) 
  } */
  return cmt;
}

// you may exced the number of request !
async function commentInfo(props) {
   const res=await axios.get(`https://oauth.reddit.com/api/info?id=t1_${props}`, {
    headers: {
      Authorization: "Bearer 685207795151-obn2-PMHn_MIO_W3DWbb1RRA80yt9w",
    },
  });
  return res.data;
}

//Blogging App using Hooks
import { useState, useRef, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";

export default function Blog() {
  // const [title,setTitle] = useState("");
  // const [content,setContent] = useState("");
  const [formData, setformData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);

  //useRef hook initialized
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  useEffect(() => {
    //using get all doc
    // async function fetchData() {
    //   const snapShot = await getDocs(collection(db, "blogs"));
    //   const blogsData = snapShot.docs.map((d) => {
    //     return {
    //       id: d.id,
    //       ...d.data()
    //     };
    //   });
    //   setBlogs(blogsData);
    // }
    // fetchData();

    //using get realtime data
    const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogsData = snapShot.docs.map((d) => {
        return {
          id: d.id,
          ...d.data()
        };
      });
      setBlogs(blogsData);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    // Add a new document with a generated id.
    const docRef = doc(collection(db, "blogs"));
    await setDoc(docRef, {
      title: formData.title,
      content: formData.content,
      createdAt: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, -8)
    });

    setformData({ title: "", content: "" });
    // dateformat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
    //Setting focus on title after adding a blog
    titleRef.current.focus();
    // console.log(blogs);
  }

  async function removeBlog(id) {
    await deleteDoc(doc(db, "blogs", id));
    // setBlogs(blogs.filter((blog, index) => index !== i));
    titleRef.current.focus();
  }

  return (
    <>
      <h1>Write a Blog!</h1>
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            className="input"
            placeholder="Enter the Title of the Blog here.."
            value={formData.title}
            ref={titleRef}
            onChange={(e) =>
              setformData({
                title: e.target.value,
                content: formData.content
              })
            }
          />

          <label label="">Content </label>
          <textarea
            className="input content"
            placeholder="Content of the Blog goes here.."
            value={formData.content}
            onChange={(e) =>
              setformData({ title: formData.title, content: e.target.value })
            }
            required
          />
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {blogs
        .sort((a, b) => {
          let dateA = new Date(a.createdAt);
          let dateB = new Date(b.createdAt);
          return dateB - dateA;
        })
        .map((blog, i) => {
          return (
            <div className="blog" key={blogs.id}>
              <h3>{blog.title}</h3>
              <hr />
              <p>{blog.content}</p>
              {/* <p>{blog.createdAt}</p> */}
              <div className="blog-btn">
                <button
                  onClick={() => {
                    removeBlog(blog.id);
                  }}
                  className="btn remove"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
}

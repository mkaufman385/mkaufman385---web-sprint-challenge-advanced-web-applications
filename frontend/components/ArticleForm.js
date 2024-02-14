import React, { useEffect, useState } from "react";
import PT from "prop-types";

const initialFormValues = { title: "", text: "", topic: "" };

export default function ArticleForm(props) {
  const {
    postArticle,
    updateArticle,
    setCurrentArticleId,
    currentArticle,
    currentArticleId,
    // articles,
    // setArticles,
  } = props;
  const [values, setValues] = useState(initialFormValues);

  // useEffect(() => {
  //   console.log("Current Article:", currentArticle);
  //   if (currentArticle) {
  //     setValues({
  //       title: currentArticle.title,
  //       text: currentArticle.text,
  //       topic: currentArticle.topic,
  //     });
  //   } else {
  //     console.log("Current Article is null or undefined");
  //     setValues(initialFormValues);
  //   }
  // }, [currentArticle]);

  useEffect(() => {
    // console.log("useEffectcurrentArticleId:", currentArticleId);
    // console.log("useEffectarticles:", articles);
    // if (currentArticleId !== null && articles) {
    //   const currentArticle = articles.find(
    //     (article) => article.article_id === currentArticleId
    //   );

    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic,
      });
      // }
    } else {
      setValues(initialFormValues);
    }
  }, [currentArticle]);

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  // const onSubmit = (evt) => {
  //   evt.preventDefault();
  //   if (currentArticleId) {
  //     updateArticle({ article_id: currentArticle.article_id, article: values });
  //     setCurrentArticleId(null);
  //   } else {
  //     postArticle(values);
  //   }

  //   setValues(initialFormValues);
  // };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const article = {
      title: values.title,
      text: values.text,
      topic: values.topic,
    };

    currentArticle
      ? updateArticle({ article, article_id: currentArticle.article_id })
      : postArticle(article);
    setCurrentArticleId();
    setValues(initialFormValues);
  };

  //   if (currentArticleId) {
  //     if (currentArticle) {
  //       updateArticle({
  //         article_id: currentArticle.article_id,
  //         article: values,
  //       });
  //       setCurrentArticleId(null);
  //     } else {
  //       console.error("currentArticle is undefined or null");
  //     }
  //   } else {
  //     postArticle(values);
  //   }

  //   setValues(initialFormValues);
  // };

  const isDisabled = () => {
    return Object.values(values).some((value) => value.trim() === "");
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId !== null ? "Edit Article" : "Create Article"}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle" type="submit">
          {/* {currentArticle ? "Submit" : "Create"}
           */}
          Submit
        </button>
        {currentArticleId !== null && !currentArticle && (
          <button onClick={() => setCurrentArticleId()}>Cancel edit</button>
        )}
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  }),
  currentArticleId: PT.number,
};

// import React, { useEffect, useState } from "react";
// import PT from "prop-types";

// const initialFormValues = { title: "", text: "", topic: "" };

// export default function ArticleForm(
//   postArticle,
//   updateArticle,
//   setCurrentArticleId,
//   currentArticle,
//   currentArticleId
// ) {
//   const isEditing = !!currentArticle;

//   const [values, setValues] = useState(initialFormValues);
//   // ✨ where are my props? Destructure them here

//   useEffect(() => {
//     console.log("Current Article:", currentArticle);
//     if (currentArticle) {
//       setValues({
//         title: currentArticle.title,
//         text: currentArticle.text,
//         topic: currentArticle.topic,
//       });
//     } else {
//       console.log("Current Article is null or undefined");
//       setValues(initialFormValues);
//     }
//   }, [currentArticle]);

//   // ✨ implement
//   // Every time the `currentArticle` prop changes, we should check it for truthiness:
//   // if it's truthy, we should set its title, text and topic into the corresponding
//   // values of the form. If it's not, we should reset the form back to initial values.

//   const onChange = (evt) => {
//     const { id, value } = evt.target;
//     setValues({ ...values, [id]: value });
//   };

//   const onSubmit = (evt) => {
//     evt.preventDefault();
//     if (currentArticle) {
//       updateArticle({ article_id: currentArticle.article_id, article: values });
//     } else {
//       postArticle(values);
//     }

//     setCurrentArticleId(null);
//     setValues(initialFormValues);
//     // ✨ implement
//     // We must submit a new post or update an existing one,
//     // depending on the truthyness of the `currentArticle` prop.
//   };

//   const isDisabled = () => {
//     return Object.values(values).some((value) => value.trim() === "");
//     // ✨ implement
//     // Make sure the inputs have some values
//   };

//   return (
//     // ✨ fix the JSX: make the heading display either "Edit" or "Create"
//     // and replace Function.prototype with the correct function
//     <form id="form" onSubmit={onSubmit}>
//       {/* <h2>Create Article</h2> */}
//       <h2>{currentArticle ? "Edit Article" : "Create Article"}</h2>
//       <input
//         maxLength={50}
//         onChange={onChange}
//         value={values.title}
//         placeholder="Enter title"
//         id="title"
//       />
//       <textarea
//         maxLength={200}
//         onChange={onChange}
//         value={values.text}
//         placeholder="Enter text"
//         id="text"
//       />
//       <select onChange={onChange} id="topic" value={values.topic}>
//         <option value="">-- Select topic --</option>
//         <option value="JavaScript">JavaScript</option>
//         <option value="React">React</option>
//         <option value="Node">Node</option>
//       </select>
//       <div className="button-group">
//         <button disabled={isDisabled()} id="submitArticle">
//           Submit
//         </button>
//         {currentArticle && (
//           <button onClick={() => setCurrentArticleId()}>Cancel edit</button>
//         )}
//       </div>
//     </form>
//   );
// }

// // 🔥 No touchy: LoginForm expects the following props exactly:
// ArticleForm.propTypes = {
//   postArticle: PT.func.isRequired,
//   updateArticle: PT.func.isRequired,
//   setCurrentArticleId: PT.func.isRequired,
//   currentArticle: PT.shape({
//     // can be null or undefined, meaning "create" mode (as opposed to "update")
//     article_id: PT.number.isRequired,
//     title: PT.string.isRequired,
//     text: PT.string.isRequired,
//     topic: PT.string.isRequired,
//   }),
// };

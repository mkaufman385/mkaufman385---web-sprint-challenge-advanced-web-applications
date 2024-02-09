import React, { useEffect, useState } from "react";
import PT from "prop-types";

const initialFormValues = { title: "", text: "", topic: "" };

export default function ArticleForm(
  postArticle,
  updateArticle,
  setCurrentArticleId,
  currentArticle
) {
  const [values, setValues] = useState(initialFormValues);
  // ✨ where are my props? Destructure them here

  useEffect(() => {
    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic,
      });
    } else {
      setValues(initialFormValues);
    }
  }, [currentArticle]);
  // ✨ implement
  // Every time the `currentArticle` prop changes, we should check it for truthiness:
  // if it's truthy, we should set its title, text and topic into the corresponding
  // values of the form. If it's not, we should reset the form back to initial values.

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (currentArticle) {
      updateArticle({ article_id: currentArticle.article_id, article: values });
    } else {
      postArticle(values);
    }

    setCurrentArticleId(null);
    setValues(initialFormValues);
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  };

  const isDisabled = () => {
    return Object.values(values).some((value) => value.trim() === "");
    // ✨ implement
    // Make sure the inputs have some values
  };

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      {/* <h2>Create Article</h2> */}
      <h2>{currentArticle ? "Edit Article" : "Create Article"}</h2>
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
        <button disabled={isDisabled()} id="submitArticle">
          Submit
        </button>
        <button onClick={Function.prototype}>Cancel edit</button>
      </div>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({
    // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  }),
};

// import React, { useState } from "react";
// import PT from "prop-types";
// // import App from App.js

// const initialFormValues = {
//   username: "",
//   password: "",
// };
// export default function LoginForm({ login }) {
//   const [values, setValues] = useState(initialFormValues);
//   // ✨ where are my props? Destructure them here

//   const onChange = (evt) => {
//     const { id, value } = evt.target;
//     setValues({ ...values, [id]: value });
//     // console.log("Updated values:", values);
//   };

//   const onSubmit = (evt) => {
//     evt.preventDefault();
//     // ✨ implement
//     login(values);
//     console.log("IFV: ", initialFormValues);
//   };

//   const isDisabled = () => {
//     // ✨ implement
//     // Trimmed username must be >= 3, and
//     // trimmed password must be >= 8 for
//     // the button to become enabled
//     return (
//       values.username.trim().length <= 3 || values.password.trim().length <= 8
//     );
//   };

//   return (
//     <form id="loginForm" onSubmit={onSubmit}>
//       <h2>Login</h2>
//       <input
//         maxLength={20}
//         value={values.username}
//         onChange={onChange}
//         placeholder="Enter username"
//         id="username"
//       />
//       <input
//         maxLength={20}
//         value={values.password}
//         onChange={onChange}
//         placeholder="Enter password"
//         id="password"
//       />
//       <button disabled={isDisabled()} id="submitCredentials">
//         Submit credentials
//       </button>
//     </form>
//   );
// }

// // 🔥 No touchy: LoginForm expects the following props exactly:
// LoginForm.propTypes = {
//   login: PT.func.isRequired,
// };

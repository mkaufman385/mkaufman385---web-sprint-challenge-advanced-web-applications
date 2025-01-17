import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Articles from "./Articles";
import LoginForm from "./LoginForm";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";
import { axiosWithAuth } from "../axios/index";
import axios from "axios";

const articlesUrl = "http://localhost:9000/api/articles";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => {
    /* ✨ implement */
    navigate("/");
  };
  const redirectToArticles = () => {
    /* ✨ implement */
    navigate("/articles");
  };

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token");
    redirectToLogin();
    setMessage("Goodbye!");
  };

  const login = ({ username, password }) => {
    setMessage("");
    setSpinnerOn(true);

    axios
      .post(loginUrl, { username, password })
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        setMessage(resp.data.message);
        redirectToArticles();
      })
      .catch((err) => {
        setMessage("Error: ", err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  };

  // ✨ implement
  // We should flush the message state, turn on the spinner
  // and launch an authenticated request to the proper endpoint.
  // On success, we should set the articles in their proper state and
  // put the server success message in its proper state.
  // If something goes wrong, check the status of the response:
  // if it's a 401 the token might have gone bad, and we should redirect to login.
  // Don't forget to turn off the spinner!
  const getArticles = () => {
    setSpinnerOn(true);
    setMessage("");
    axiosWithAuth()
      .get(articlesUrl)
      .then((resp) => {
        setArticles(resp.data.articles);

        setMessage(resp.data.message);
      })
      .catch((err) => {
        redirectToLogin();
        setMessage(err.message);
        setSpinnerOn(false);
        console.log("getArticleError: ", err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const postArticle = (article) => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth()
      .post(articlesUrl, article)
      .then((resp) => {
        // console.log("postArticleResp: ", resp);
        setMessage(resp.data.message);
        setArticles((articles) => {
          return articles.concat(resp.data.article);
        });
        // Initialy removed getArticles cause it was causing a reresh which changed the message but having the getArticles here is what is allowing a new article to automatically be added to the list without page refresh
        // getArticles();
      })
      .catch((err) => {
        setMessage(err.message);
        // console.log("postArticleErr: ", err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  // ✨ implement
  // The flow is very similar to the `getArticles` function.
  // You'll know what to do! Use log statements or breakpoints
  // to inspect the response from the server.

  const updateArticle = ({ article_id, article }) => {
    setMessage("");
    setSpinnerOn(true);

    axiosWithAuth()
      .put(`http://localhost:9000/api/articles/${article_id}`, article)
      .then((resp) => {
        console.log(resp);
        setMessage(resp.data.message);
        setArticles((articles) => {
          return articles.map((art) => {
            return art.article_id === article_id ? resp.data.article : art;
          });
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
    // ✨ implement
    // You got this!
  };

  const deleteArticle = (article_id) => {
    const url = `http://localhost:9000/api/articles/${article_id}`;
    console.log("Delete URL:", url);
    setSpinnerOn(false);
    setMessage("");

    axiosWithAuth()
      .delete(`http://localhost:9000/api/articles/${article_id}`)
      .then((resp) => {
        console.log(resp);

        setArticles((articles) => {
          return articles.filter((article) => {
            return article.article_id !== article_id;
          });
        });
        // setArticles(updatedArticles);
        setMessage(resp.data.message);
      })
      .catch((err) => {
        console.log("deleteERR: ", err);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>
        Logout from app
      </button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        {" "}
        {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">
            Login
          </NavLink>
          <NavLink id="articlesScreen" to="/articles">
            Articles
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route
            path="articles"
            element={
              <>
                <ArticleForm
                  postArticle={postArticle}
                  updateArticle={updateArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticle={articles.find(
                    (art) => art.article_id == currentArticleId
                  )}
                />
                <Articles
                  articles={articles}
                  getArticles={getArticles}
                  deleteArticle={deleteArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticleId={currentArticleId}
                />
              </>
            }
          />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  );
}

import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import MessageModel from "../../../models/MessageModel";
import axios from "axios";

export const PostNewMessage = () => {
  const { authState } = useOktaAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewQuestion() {
    const url = `/api/messages/secure/add/message`;
    if (authState?.isAuthenticated && title !== "" && question !== "") {
      const message: MessageModel = new MessageModel(title, question);
      const res = await axios.post(url, message, {
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        },
      });
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      setTitle("");
      setQuestion("");
      setDisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="card mt-3">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Question added successfully
        </div>
      )}
      <div className="card-header">Ask question to Admin</div>
      <div className="card-body">
        <form method="POST" onSubmit={(e) => e.preventDefault()}>
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All fields must be filled out
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={submitNewQuestion}
            >
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

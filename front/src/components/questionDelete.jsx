import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../services/usersService";

const QuestionDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteQuestion = async () => {
      await userService.deleteQuestion(id);
      navigate("/");
      toast("The question deleted 👏🏾");
    };

    deleteQuestion();
  }, [id, navigate]);

  return null;
};

export default QuestionDelete;

import httpService from "./httpService";

const TOKEN_KEY = "token";

setTokenHeader();

export function setTokenHeader() {
  if (localStorage.getItem(TOKEN_KEY)) {
    httpService.setCommonHeader("x-auth-token", localStorage.getItem(TOKEN_KEY));
  }
}

// Create User / Sign Up
export function createUser(user) {
  return httpService.post("/users", user);
}

// Log In / Sign In
export async function loginUser(credentials) {
  const response = await httpService.post("/users/login", credentials);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  setTokenHeader();

  return response;
}

// Log Out / Sign Out
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

// Get all users
export async function getAllUsers() {
  const response = await httpService.get("/users");
  return response;
}

// Get Myself
export async function getMyself() {
  const response = await httpService.get("/users/me");
  return response;
}

// Add score
export async function addScore(answer) {
  const response = await httpService.put(`/users/addScore`, answer);
  return response;
}

// Get Question By ID
export async function getQuestionByID(id) {
  return await httpService.get(`/questions/${id}`);
}

// Create Question
export async function createQuestion(question) {
  return await httpService.post("/questions", question);
}

// Edit Question
export async function editQuestion(id, question) {
  return await httpService.put(`/questions/${id}`, question);
}

// Delete Question
export async function deleteQuestion(id) {
  return await httpService.delete(`/questions/${id}`);
}

const userService = {
  createUser,
  loginUser,
  logout,
  getAllUsers,
  getMyself,
  addScore,
  getQuestionByID,
  createQuestion,
  editQuestion,
  deleteQuestion
};

export default userService;

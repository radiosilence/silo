import jobs from "./jobs.js";

export const QUIZZES = Object.fromEntries([jobs].map((q) => [q.id, q]));

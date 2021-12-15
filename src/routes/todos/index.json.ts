import type { RequestHandler } from "@sveltejs/kit"

let todos: Todo[] = [];

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: todos
  }
}

export const post: RequestHandler<{}, FormData> = (req) => {
  todos.push({
    created_at: new Date(),
    text: req.body.get('text'),
    done: false
  });
  console.log(req.body.get("text"));

  return {
    status: 303,
    headers: {
      location: '/'
    }
  }
}


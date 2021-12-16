import type {Request} from '@sveltejs/kit';
let todos: Todo[] = [];

// export const api = (req: Request, todo?: Todo) => {
export const api = (req: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (req.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      todos.push(data as Todo)
      body = data;
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter(todo => todo.uid !== req.params.uid)
      status = 200;
      break;
    case 'PATCH':
      todos = todos.map(todo => {
        if (todo.uid === req.params.uid) {
          todo.text = data.text as string;
        }
        return todo;
      });
      status = 200;
      break;
    default:
      break;
  }

  if (req.method.toUpperCase() !== "GET") {
    return {
      status: 303,
      headers: {
        location: '/'
      }
    }
  }

  return {
    status,
    body,
  }
}
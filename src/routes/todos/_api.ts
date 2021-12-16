import type {Request} from '@sveltejs/kit';
let todos: Todo[] = [];

export const api = (req: Request, todo?: Todo) => {
  let body = {};
  let status = 500;

  switch (req.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      todos.push(todo)
      body = todo;
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter(todo => todo.uid !== req.params.uid)
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
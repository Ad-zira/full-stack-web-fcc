import type {Request} from '@sveltejs/kit';
import PrismaClient from "$lib/prisma"; // small little workaround we need to make this work on local environment or gitpod here, as well as on vercel

/* let todos: Todo[] = []; */ // we can finally get rid of this to-dos array and no longer keep the todo items in memory and lose them everytime we restart the server 

// New instance of the prisma client
const prisma = new PrismaClient();

// export const api = (req: Request, todo?: Todo) => {
export const api = async (req: Request, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;

  switch (req.method.toUpperCase()) {
    case 'GET':
      body = await prisma.todo.findMany();
      status = 200;
      break;
    case 'POST':
      // todos.push(data as Todo)
      body = await prisma.todo.create({
        data: {
          created_at: data.created_at as Date,
          done: data.done as boolean,
          text: data.text as string,
        }
      })
      status = 201;
      break;
    case 'DELETE':
      // todos = todos.filter(todo => todo.uid !== req.params.uid)
      body = await prisma.todo.delete({
        where: {
          uid: req.params.uid
        }
      })
      status = 200;
      break;
    case 'PATCH':
      body = await prisma.todo.update({
        where: {
          uid: req.params.uid
        },
        data: {
          done: data.done as boolean,
          text: data.text as string 
        }
      })
      status = 200;
      break;
    default:
      break;
  }

  if (
        req.method.toUpperCase() !== "GET" && 
        req.headers.accept !== "application/json"
      )  {
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
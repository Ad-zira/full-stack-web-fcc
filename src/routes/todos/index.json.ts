import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"

export const get: RequestHandler = (req) => {
  return api(req)
}

export const post: RequestHandler<{}, FormData> = (req) => {
  return api(req, {
    created_at: new Date(),
    text: req.body.get('text'),
    done: false
  })
}


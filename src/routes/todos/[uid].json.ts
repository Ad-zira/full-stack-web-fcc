import type { RequestHandler } from "@sveltejs/kit"
import { api } from "./_api"

export const del: RequestHandler = (req) => {
  return api(req)
}

export const patch: RequestHandler<{}, FormData> = (req) => {
  return api(req, {
    text: req.body.get('editedText'),
    done: req.body.has('done') ? !!req.body.get('done') : undefined
  })
}
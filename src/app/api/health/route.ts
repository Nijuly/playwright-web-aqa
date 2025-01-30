import { config } from '~/lib/config'

export const GET = async () => {
  if (config.health.config.hasInfiniteLoop) {
    while (true) {}
  }

  return new Response('OK', { status: 200 })
}

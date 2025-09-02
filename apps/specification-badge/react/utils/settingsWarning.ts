import { canUseDOM } from 'vtex.render-runtime'

export const settingsWarning = (message: string) => {
  if(!canUseDOM) return

  console.warn(`${message} ${process.env.NODE_ENV !== "development" ? '' : `${window.location?.origin}/admin/apps/${process.env.VTEX_APP_ID}/setup/` }`)
}

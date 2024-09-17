/* Stay the type of database entity table, the specific content is ./entities */
declare namespace Entity {
}

/* Data types returned by various interfaces, the specific content is ./api */
declare namespace Api {

}

interface Window {
  $loadingBar: import('naive-ui').LoadingBarApi
  $dialog: import('naive-ui').DialogApi
  $message: import('naive-ui').MessageApi
  $notification: import('naive-ui').NotificationApi
}

declare const AMap: any
declare const BMap: any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
}

declare namespace Storage {
  interface Session {
    dict: DictMap
  }

  interface Local {
    /* Store user information */
    userInfo: Api.Login.Info
    /* Store access token */
    accessToken: string
    /* Store refresh token */
    refreshToken: string
    /* Store login account */
    loginAccount: any
    /* Store the current language */
    lang: App.lang
  }
}

declare namespace App {
  type lang = 'zhCN' | 'enUS'
}

interface DictMap {
  [key: string]: Entity.Dict[]
}

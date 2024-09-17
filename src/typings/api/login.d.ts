/// <reference path="../global.d.ts"/>

namespace Api {
  namespace Login {
    /* Log in to the user field returned, which is based on the user table expansion. Some fields may need to be covered, such as ID */
    interface Info extends Entity.User {
      /** User ID */
      id: number
      /** User character type */
      role: Entity.RoleType
      /** Visit token */
      accessToken: string
      /** Refresh token */
      refreshToken: string
    }
  }
}

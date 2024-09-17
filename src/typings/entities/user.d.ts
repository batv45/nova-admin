/// <reference path="../global.d.ts"/>

/** User database table field */
namespace Entity {
  interface User {
    /** User ID */
    id?: number
    /** username */
    userName?: string
    /* User avatar */
    avatar?: string
    /* Gender */
    gender?: 0 | 1
    /* User mailbox */
    email?: string
    /* User nickname */
    nickname?: string
    /* User phone call */
    tel?: string
    /** User character type */
    role?: Entity.RoleType[]
    /** User status */
    status?: 0 | 1
    /** Remark */
    remark?: string
  }

}

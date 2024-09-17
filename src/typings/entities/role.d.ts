/// <reference path="../global.d.ts"/>

/* Character database table field */
namespace Entity {
  type RoleType = 'super' | 'admin' | 'user'

  interface Role {
    /** User ID */
    id?: number
    /** username */
    role?: RoleType
  }
}

declare namespace AppRoute {

  type MenuType = 'dir' | 'page'
  /** Meta logo carried by a single route */
  interface RouteMeta {
    /* Page title, usually optional. */
    title: string
    /* Icon, generally combined with menu use */
    icon?: string
    /* Do you need login permissions. */
    requiresAuth?: boolean
    /* The character that can be accessed */
    roles?: Entity.RoleType[]
    /* Whether to turn on the page cache */
    keepAlive?: boolean
    /* Some routes do not want to display in the menu, such as some editing pages. */
    hide?: boolean
    /* Menu sort. */
    order?: number
    /* Outer chain  */
    href?: string
    /** The current routing is not displayed on the left menu, but the situation of the menu is required to be highlighted */
    activeMenu?: string
    /** Whether the current routing will be added to the tab */
    withoutTab?: boolean
    /** Whether the current routing will be fixed in TAB and used for some resident page */
    pinTab?: boolean
    /** The current routing is the directory or page on the left menu, without setting the default default Page */
    menuType?: MenuType
  }

  type MetaKeys = keyof RouteMeta

  interface baseRoute {
    /** Route name (the unique logo of the routing) */
    name: string
    /** Route */
    path: string
    /** Route redirection */
    redirect?: string
    /* Page component address */
    componentPath?: string | null
    /* Routing ID */
    id: number
    /* Father -level route ID, top page is null */
    pid: number | null
  }

  /** Type structure of a single routing (dynamic routing mode: route back to this type of structure) */
  type RowRoute = RouteMeta & baseRoute

  /**
   * The real routing structure of mounting to the project
   */
  interface Route extends baseRoute {
    /** Sub -route */
    children?: Route[]
    /* Page component */
    component: any
    /** Routing description */
    meta: RouteMeta
  }

}

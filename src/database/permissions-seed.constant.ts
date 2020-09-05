export default class Permissions {
  public modules = [
    { name: 'USER', description: 'CRUD user' },
    { name: 'DESTINATION', description: 'CRUD destination' },
    { name: 'CATEGORY', description: 'CRUD category' },
    { name: 'ROLE', description: 'CRUD role' }
  ];

  public methods = [
    { name: 'GET', description: 'Retrieve object' },
    { name: 'POST', description: 'Create object' },
    { name: 'PUT', description: 'Replace object' },
    { name: 'DELETE', description: 'Delete object' },
    { name: 'PATCH', description: 'Update object' },
    { name: 'GETLIST', description: 'Get list information' }

  ];

  public roles = [
    {
      name: 'ADMIN',
      description: 'Admin has all the permissions'
    },
    {
      name: 'MODERATOR',
      description: 'manage goods'
    },
    {
      name: 'OWNER',
      description: 'review order'
    },
    {
      name: 'USER',
      description: 'user'
    }
  ]

  public admin_role_permission = [
    {
      module: 'USER',
      methods: this.methods
    },
    {
      module: 'ROLE',
      methods: this.methods
    }
  ]

  public manager_role_permission = [
    {
      module: 'USER',
      methods: [
        { name: 'DELETE', description: 'Delete object' },
        { name: 'PATCH', description: 'Update object' }
      ]
    },
    {
      module: 'ROLE',
      methods: this.methods
    }
  ]

  public role_permissions = [
    {
      role: 'ADMIN',
      permissions: this.admin_role_permission
    },
    {
      role: 'MODERATOR',
      permissions: this.manager_role_permission
    }
  ]

}

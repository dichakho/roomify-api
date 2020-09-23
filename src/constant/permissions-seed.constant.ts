export default class Permissions {
  public modules = [
    { name: 'USER', description: 'CRUD user' },
    { name: 'DESTINATION', description: 'CRUD destination' },
    { name: 'AMENITY', description: 'CRUD amenity' },
    { name: 'PROPERTY', description: 'CRUD property' },
    { name: 'ROOM', description: 'CRUD room' },
    { name: 'CATEGORY', description: 'CRUD category' }
  ];

  public methods = [
    { name: 'GET', description: 'Retrieve object' },
    { name: 'POST', description: 'Create object' },
    { name: 'PUT', description: 'Replace object' },
    { name: 'DELETE', description: 'Delete object' },
    { name: 'PATCH', description: 'Update object' },
    { name: 'GETLIST', description: 'Get list information' },
    { name: 'MANAGEROLE', description: 'Change role of user' },
    { name: 'DELETESOFT', description: 'Delete object but already exist' }

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

  public moderator_role_permission = [
    {
      module: 'USER',
      methods: [
        { name: 'DELETE', description: 'Delete object' },
        { name: 'PATCH', description: 'Update object' },
        { name: 'GET', description: 'Retrieve object' }
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
      permissions: this.moderator_role_permission
    }
  ]
}

export default class Permissions {
  public modules = [
    { name: 'USER', description: 'CRUD user' },
    { name: 'DESTINATION', description: 'CRUD destination' },
    { name: 'AMENITY', description: 'CRUD amenity' },
    { name: 'PROPERTY', description: 'CRUD property' },
    { name: 'ROOM', description: 'CRUD room' },
    { name: 'CATEGORY', description: 'CRUD category' },
    { name: 'USER_PERMISSION', description: 'CRUD user permission' }
  ];

  public methods = [
    { name: 'GET', description: 'Retrieve object' },
    { name: 'POST', description: 'Create object' },
    { name: 'PUT', description: 'Replace object' },
    { name: 'DELETE', description: 'Delete object' },
    { name: 'PATCH', description: 'Update object' },
    { name: 'GETLIST', description: 'Get list information' },
    { name: 'MANAGEROLE', description: 'Change role of user' },
    { name: 'RESTORE', description: 'Restore data was deleted' }
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
      module: 'DESTINATION',
      methods: this.methods
    },
    {
      module: 'AMENITY',
      methods: this.methods
    },
    {
      module: 'PROPERTY',
      methods: this.methods
    },
    {
      module: 'ROOM',
      methods: this.methods
    },
    {
      module: 'CATEGORY',
      methods: this.methods
    },
    {
      module: 'USER_PERMISSION',
      methods: this.methods
    }
  ]

  public moderator_role_permission = [
    {
      module: 'USER',
      methods: [
        { name: 'DELETE', description: 'Delete object' },
        { name: 'PATCH', description: 'Update object' },
        { name: 'GET', description: 'Retrieve object' },
        { name: 'RESTORE', description: 'Restore data was deleted' },
        { name: 'GETLIST', description: 'Get list information' }
      ]
    },
    {
      module: 'DESTINATION',
      methods: this.methods
    },
    {
      module: 'AMENITY',
      methods: this.methods
    },
    {
      module: 'PROPERTY',
      methods: this.methods
    },
    {
      module: 'ROOM',
      methods: this.methods
    },
    {
      module: 'CATEGORY',
      methods: this.methods
    },
    {
      module: 'USER_PERMISSION',
      methods: this.methods
    }
  ]

  public owner_role_permission = [
    {
      module: 'USER',
      methods: [
        { name: 'DELETE', description: 'Delete object' },
        { name: 'PATCH', description: 'Update object' },
        { name: 'GET', description: 'Retrieve object' },
        { name: 'RESTORE', description: 'Restore data was deleted' },
        { name: 'GETLIST', description: 'Get list information' }

      ]
    },
    {
      module: 'DESTINATION',
      methods: []
    },
    {
      module: 'AMENITY',
      methods: this.methods
    },
    {
      module: 'PROPERTY',
      methods: this.methods
    },
    {
      module: 'ROOM',
      methods: this.methods
    },
    {
      module: 'CATEGORY',
      methods: [
        { name: 'GETLIST', description: 'Get list information' }
      ]
    }
  ]

  public user_role_permission = [
    {
      module: 'USER',
      methods: []
    },
    {
      module: 'DESTINATION',
      methods: []
    },
    {
      module: 'AMENITY',
      methods: []
    },
    {
      module: 'PROPERTY',
      methods: [
        { name: 'GETLIST', description: 'Get list information' }
      ]
    },
    {
      module: 'ROOM',
      methods: [
        { name: 'GETLIST', description: 'Get list information' }
      ]
    },
    {
      module: 'CATEGORY',
      methods: []
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
    },
    {
      role: 'OWNER',
      permissions: this.owner_role_permission
    },
    {
      role: 'USER',
      permissions: this.user_role_permission
    }
  ]
}

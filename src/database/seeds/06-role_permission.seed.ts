import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';
import Permissions from '../permissions-seed.constant';

export default class CreateRolePermission implements Seeder {
  private rolePermission = [];

  private permission: Permissions = new Permissions()

  private Excute(): void {
    this.permission.role_permissions.forEach(role_permission => {
      for (let i = 0; i < this.permission.roles.length; i += 1) {
        if (role_permission.role === this.permission.roles[i].name) {
          role_permission.permissions.forEach(permission => {
            for (let j = 0; j < this.permission.modules.length; j += 1) {
              if (this.permission.modules[j].name === permission.module) {
                permission.methods.forEach(method => {
                  for (let k = 0; k < this.permission.methods.length; k += 1) {
                    if (method.name === this.permission.methods[k].name)
                      this.rolePermission.push({ rolesId: i + 1, permissionsId: (j * this.permission.methods.length) + k + 1 });
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  public async run(factory: Factory): Promise<any> {
    // const role_permission = [{ rolesId: 1, permissionsId: 1 }];
    const connection: Connection = getConnection();
    // const repository = connection.getRepository(Permission);
    // const userRepository = connection.getRepository(Module);

    /**
     * Admin Permission
     */
    // const adminPermission = await connection
    //   .getRepository(Permission)
    //   .createQueryBuilder('permissions')
    //   .select('permissions.id')
    //   .getMany();
    // adminPermission.map(a => this.rolePermission.push({ rolesId: 1, permissionsId: a.id }));

    // /**
    //  * Manager, Reviewer Permissions
    //  */
    // const modules = await connection
    //   .getRepository(Module)
    //   .createQueryBuilder('modules')
    //   .where('modules.name IN (:...names)', {
    //     names: ['USER', 'PRODUCT', 'CATEGORY']
    //   })
    //   .select('modules.id')
    //   .getMany();
    // const moduleIds = [];
    // modules.map(module => moduleIds.push(module.id));
    // const permissions = await connection
    //   .getRepository(Permission)
    //   .createQueryBuilder('permissions')
    //   .where('permissions.moduleId IN (:...moduleIds)', {
    //     moduleIds
    //   })
    //   .select('permissions.id')
    //   .getMany();
    // for (let i = 2; i <= 3; i += 1) {
    //   permissions.map(permission => {
    //     this.rolePermission.push({ rolesId: i, permissionsId: permission.id });
    //   });
    // }

    // /**
    //  * User Permission
    //  */
    // const userModules = await connection
    //   .getRepository(Module)
    //   .createQueryBuilder('modules')
    //   .where('modules.name IN (:...names)', {
    //     names: ['PRODUCT', 'CATEGORY']
    //   })
    //   .select('modules.id')
    //   .getMany();

    // const userModuleIds = [];
    // userModules.map(m => userModuleIds.push(m.id));
    // const userPermissions = await connection
    //   .getRepository(Permission)
    //   .createQueryBuilder('permissions')
    //   .where('permissions.moduleId IN (:...moduleIds)', {
    //     moduleIds: userModuleIds
    //   })
    //   .andWhere('permissions.methodId = :methodId', { methodId: 1 })
    //   .select('permissions.id')
    //   .getMany();
    // userPermissions.map(u => this.rolePermission.push({ rolesId: 4, permissionsId: u.id }));
    this.Excute();
    await connection
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values(this.rolePermission)
      .execute();
  }
}

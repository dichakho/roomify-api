import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';
import { Permission } from '../../entities/permission.entity';
import { Module } from '../../entities/module.entity';

export default class CreateRolePermission implements Seeder {
  public async run(factory: Factory): Promise<any> {
    // const role_permission = [{ rolesId: 1, permissionsId: 1 }];
    const rolePermission = [];
    const connection: Connection = getConnection();
    // const repository = connection.getRepository(Permission);
    // const userRepository = connection.getRepository(Module);

    /**
     * Admin Permission
     */
    const adminPermission = await connection
      .getRepository(Permission)
      .createQueryBuilder('permissions')
      .select('permissions.id')
      .getMany();
    adminPermission.map(a => rolePermission.push({ rolesId: 1, permissionsId: a.id }));

    /**
     * Manager, Reviewer Permissions
     */
    const modules = await connection
      .getRepository(Module)
      .createQueryBuilder('modules')
      .where('modules.name IN (:...names)', {
        names: ['USER', 'PRODUCT', 'CATEGORY']
      })
      .select('modules.id')
      .getMany();
    const moduleIds = [];
    modules.map(module => moduleIds.push(module.id));
    const permissions = await connection
      .getRepository(Permission)
      .createQueryBuilder('permissions')
      .where('permissions.moduleId IN (:...moduleIds)', {
        moduleIds
      })
      .select('permissions.id')
      .getMany();
    for (let i = 2; i <= 3; i += 1) {
      permissions.map(permission => {
        rolePermission.push({ rolesId: i, permissionsId: permission.id });
      });
    }

    /**
     * User Permission
     */
    const userModules = await connection
      .getRepository(Module)
      .createQueryBuilder('modules')
      .where('modules.name IN (:...names)', {
        names: ['PRODUCT', 'CATEGORY']
      })
      .select('modules.id')
      .getMany();

    const userModuleIds = [];
    userModules.map(m => userModuleIds.push(m.id));
    const userPermissions = await connection
      .getRepository(Permission)
      .createQueryBuilder('permissions')
      .where('permissions.moduleId IN (:...moduleIds)', {
        moduleIds: userModuleIds
      })
      .andWhere('permissions.methodId = :methodId', { methodId: 1 })
      .select('permissions.id')
      .getMany();
    userPermissions.map(u => rolePermission.push({ rolesId: 4, permissionsId: u.id }));

    await connection
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values(rolePermission)
      .execute();
  }
}

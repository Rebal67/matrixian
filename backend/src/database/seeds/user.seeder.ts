import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await dataSource.manager.query('truncate user');
    await repository.insert([
      {
        firstName: 'Rebal',
        lastName: 'Alhaqash',
        email: 'rebal@gmail.com',
        password: 'test',
      },
    ]);
    await repository.insert([
      {
        firstName: 'Alex',
        lastName: 'Kolisnychenko',
        email: 'alexk@matrixiangroup.com',
        password: 'test',
      },
    ]);

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(User);
    // save 1 factory generated entity, to the database
    await userFactory.save();

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(20);
  }
}

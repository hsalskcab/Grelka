using Grelka.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Grelka.Server.Repositories
{
    interface IRepository<T> : IDisposable
        where T : class
    {
        Task<IEnumerable<T>> GetAll(); // получение всех объектов
        Task<T> Get(Guid id); // получение одного объекта по id
        Task Create(T item); // создание объекта
        Task Update(T item); // обновление объекта
        Task Delete(Guid id); // удаление объекта по id
    } 
}

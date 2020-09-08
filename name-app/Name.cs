using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace name_app
{

    public class NamesContext : DbContext
    {
        public NamesContext(DbContextOptions<NamesContext> options) : base(options) { }
        public DbSet<Name> Names { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder) => modelBuilder.Entity<Name>().ToTable("Name");

        public Name RunGetGuidOfUserAndCreateIfNotInDatabase(Name lookup)
        {
            var parameters = new[]
            {
                new SqlParameter("@First", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = lookup.First },
                new SqlParameter("@Last", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = lookup.Last }
            };

            Name result = this.Names.FromSqlRaw("EXEC [sp_GetGuidOfUserAndCreateIfNotInDatabase] @First, @Last", parameters).AsEnumerable<Name>().First();
            return result;
        }

        public IEnumerable<Name> RunGetAllUsersThatMatchFirstSetOfCharacters(string mode, string name)
        {
            var parameters = new[]
            {
                new SqlParameter("@PassedName", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = name },
                new SqlParameter("@Mode", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = mode }
            };

            return this.Names.FromSqlRaw("EXEC [sp_GetAllUsersThatMatchFirstSetOfCharacters] @PassedName, @Mode", parameters).AsEnumerable<Name>();
        }
    }

    public class Name
    {
        public Guid ID { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
    }
}

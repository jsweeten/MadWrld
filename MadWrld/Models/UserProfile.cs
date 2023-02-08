﻿using Microsoft.SqlServer.Server;

namespace MadWrld.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
    }
}

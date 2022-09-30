﻿// <auto-generated />
using System;
using DripGuide.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DripGuide.Migrations
{
    [DbContext(typeof(DripContext))]
    [Migration("20220930111043_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DripGuide.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Colorway")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Description2")
                        .IsRequired()
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("FK_Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("FK_User")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Material")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("datetime");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("StyleCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("SubmitDate")
                        .HasColumnType("datetime");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id")
                        .HasName("PK_Post");

                    b.HasIndex(new[] { "FK_User" }, "fk_user");

                    b.ToTable("Post", (string)null);
                });

            modelBuilder.Entity("DripGuide.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(150)");

                    b.Property<byte>("Role")
                        .HasColumnType("tinyint");

                    b.HasKey("Id")
                        .HasName("PK_User");

                    b.ToTable("User", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatWeb.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Biblioteka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojPolica = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biblioteka", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Polica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oznaka = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MaxBroj = table.Column<int>(type: "int", nullable: false),
                    TrenutniBroj = table.Column<int>(type: "int", nullable: false),
                    BibliotekaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polica", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Polica_Biblioteka_BibliotekaID",
                        column: x => x.BibliotekaID,
                        principalTable: "Biblioteka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Knjiga",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Autor = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    BrojStrana = table.Column<int>(type: "int", nullable: false),
                    PolicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjiga", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Knjiga_Polica_PolicaID",
                        column: x => x.PolicaID,
                        principalTable: "Polica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Knjiga_PolicaID",
                table: "Knjiga",
                column: "PolicaID");

            migrationBuilder.CreateIndex(
                name: "IX_Polica_BibliotekaID",
                table: "Polica",
                column: "BibliotekaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Knjiga");

            migrationBuilder.DropTable(
                name: "Polica");

            migrationBuilder.DropTable(
                name: "Biblioteka");
        }
    }
}

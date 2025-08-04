using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lesson_1.Migrations
{
    /// <inheritdoc />
    public partial class serviceNew6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarService_Cars_CarId",
                table: "CarService");

            migrationBuilder.DropForeignKey(
                name: "FK_CarService_Services_ServiceId",
                table: "CarService");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarService",
                table: "CarService");

            migrationBuilder.RenameTable(
                name: "CarService",
                newName: "CarServices");

            migrationBuilder.RenameIndex(
                name: "IX_CarService_ServiceId",
                table: "CarServices",
                newName: "IX_CarServices_ServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarServices",
                table: "CarServices",
                columns: new[] { "CarId", "ServiceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CarServices_Cars_CarId",
                table: "CarServices",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarServices_Services_ServiceId",
                table: "CarServices",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarServices_Cars_CarId",
                table: "CarServices");

            migrationBuilder.DropForeignKey(
                name: "FK_CarServices_Services_ServiceId",
                table: "CarServices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarServices",
                table: "CarServices");

            migrationBuilder.RenameTable(
                name: "CarServices",
                newName: "CarService");

            migrationBuilder.RenameIndex(
                name: "IX_CarServices_ServiceId",
                table: "CarService",
                newName: "IX_CarService_ServiceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarService",
                table: "CarService",
                columns: new[] { "CarId", "ServiceId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CarService_Cars_CarId",
                table: "CarService",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarService_Services_ServiceId",
                table: "CarService",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

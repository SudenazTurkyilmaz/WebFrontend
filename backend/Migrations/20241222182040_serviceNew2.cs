using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lesson_1.Migrations
{
    /// <inheritdoc />
    public partial class serviceNew2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarService_Services_ServicesId",
                table: "CarService");

            migrationBuilder.RenameColumn(
                name: "ServicesId",
                table: "CarService",
                newName: "ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_CarService_ServicesId",
                table: "CarService",
                newName: "IX_CarService_ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarService_Services_ServiceId",
                table: "CarService",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarService_Services_ServiceId",
                table: "CarService");

            migrationBuilder.RenameColumn(
                name: "ServiceId",
                table: "CarService",
                newName: "ServicesId");

            migrationBuilder.RenameIndex(
                name: "IX_CarService_ServiceId",
                table: "CarService",
                newName: "IX_CarService_ServicesId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarService_Services_ServicesId",
                table: "CarService",
                column: "ServicesId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

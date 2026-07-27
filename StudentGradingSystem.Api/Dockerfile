FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["StudentGradingSystem.Api.csproj", "./"]
RUN dotnet restore "StudentGradingSystem.Api.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "StudentGradingSystem.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "StudentGradingSystem.Api.dll"]

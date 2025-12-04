FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WealthSentinels.api.csproj", "./"]
RUN dotnet restore "WealthSentinels.api.csproj"
COPY . .
RUN dotnet build "WealthSentinels.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WealthSentinels.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Important: Set the PORT environment variable
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "WealthSentinels.api.dll"]
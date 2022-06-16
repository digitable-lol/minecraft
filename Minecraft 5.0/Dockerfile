#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Minecraft 5.0/Minecraft 5.0.csproj", "Minecraft 5.0/"]
RUN dotnet restore "Minecraft 5.0/Minecraft 5.0.csproj"
COPY . .
WORKDIR "/src/Minecraft 5.0"
RUN dotnet build "Minecraft 5.0.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Minecraft 5.0.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Minecraft 5.0.dll"]
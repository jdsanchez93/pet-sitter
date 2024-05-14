FROM node:18 as clientbuild
WORKDIR /usr/local/app
COPY ./pet-sitter-client/package.json ./pet-sitter-client/package-lock.json .
RUN npm install
COPY ./pet-sitter-client .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./pet-sitter-api/pet-sitter-api.csproj .
RUN dotnet restore
COPY ./pet-sitter-api .
COPY --from=clientbuild /usr/local/app/dist/pet-sitter-client/browser ./wwwroot
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "pet-sitter-api.dll"]

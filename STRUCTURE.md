src
│
├── common
│ ├── decorators
│ ├── exceptions
│ └── interceptors
│
├── config
│ └── app.config.ts (Configuration)
│
├── database
│ └── entities
│ ├── user.entity.ts
│ ├── product.entity.ts
│ ├── category.entity.ts
│ └── order.entity.ts
│ └── migrations
│ └── seeds
│ └── database.module.ts
│
├── modules
│ ├── auth
│ │ ├── auth.module.ts
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── strategies
│ │ │ └── local.strategy.ts
│ │ └── guards
│ │ └── jwt-auth.guard.ts
│ └── users
│ ├── users.module.ts
│ ├── users.controller.ts
│ ├── users.service.ts
│ ├── dtos
│ │ └── create-user.dto.ts
│ └── interfaces
│ └── user.interface.ts
│
├── app.module.ts
├── main.ts
└── env
└── .env

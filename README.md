# Grown Folks Collective Server
A professional networking platforms for industry leaders to connect through events. 


## Data Collections
1. **Applicants**: Manages the community members and their application status (20+ sample documents).
2. **Events**: Networking mixers and workshops (5+ sample documents).
3. **Partnerships**: Corporate perks available to members (5+ sample documents).

### Applicants
- `GET /api/applicants` - Retrieve all applicants.
- `POST /api/applicants` - Submit a new application.
- `PUT /api/applicants/:id` - Update applicant status or details.
- `DELETE /api/applicants/:id` - Remove an applicant from the system.
- `GET /api/applicants/:id/category` - Find other members in the same industry.

### Database Seeding
- `GET /api/applicants/seed-all` - Wipes all collections and repopulates them with 35+ total documents.

## Technical Details
- **Mongoose**: Used for Schema enforcement and validation.
- **Indexing**: Optimized `email`, `industry`, and `category` fields for high-read performance.
- **Validation**: Implemented `enum` restrictions for member tiers and partnership categories.

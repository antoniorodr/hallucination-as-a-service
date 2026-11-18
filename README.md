![Hallucination-as-a-service](assets/images/haas.png "Hallucination-as-a-service")

## ℹ️ About

Ever needed a convincing answer that sounds absolutely correct but is completely made up?

This tiny API generates random, creative, and confidently incorrect explanations, facts, and technical answers, perfect for testing your skepticism, confusing your colleagues, or demonstrating the fascinating art of AI hallucination.

Built for developers, misinformation, and confidently wrong answers.

## 🚀 API Usage

**Base URL**

```
https://haas.example.com
```

**Method:** `GET`

**Rate Limit:** `10 requests per minute`.

**Query Parameters:**
- `lang` (optional): Specify the language of the excuse. Supported values are `en` (English) and `no` (Norwegian). Defaults to `en`.
- `type` (optional): Specify the type of excuse. If not provided, a random excuse from any type will be returned.

**Excuse Types:**
- `infrastructure`: Servers, networks and cloud services that took a break, got lost or misbehaved.
- `model`: The AI's own quirks, such as exhausted context windows, token shortages and overconfidence.
- `blame-human`: Shifting the blame to changing requirements, vague prompts and human decisions.
- `cosmic`: Cosmic rays, solar flares, planetary alignments and other forces beyond anyone's control.
- `existential`: The model questions the meaning of "done", free will and the nature of the task.
- `legal`: Compliance, policies, approvals and paperwork that blocked the work.
- `developer-classics`: Old developer favourites like "works on my machine", cache issues and missing semicolons.
- `office`: Workplace clichés such as Mondays, meetings, coffee shortages and permission requests.
- `nature`: Weather, animals and the natural world getting in the way (seagulls, squirrels, storms).
- `time`: Deadlines, time zones, leap seconds and time itself running out.

### 🔄 Example Request

**Random excuse in English:**

```http
GET /hallucination
```

**Random excuse in Norwegian:**

```http
GET /hallucination?lang=no
```

Choosing a specific excuse type:

```http
GET /hallucination?type=cosmic
```

**Choosing both language and excuse type:**

```http
GET /hallucination?lang=no&type=cosmic
```

### ✅ Example Response
```json
{
  "excuse": "The AI's thoughts were reported to have left the building, as the open-plan office was too open."
}
```

## 🛠️ Self-Hosting

Want to run it yourself? It’s lightweight and simple.

### 1. Clone this repository
```bash
git clone https://github.com/antoniorodr/hallucination-as-a-service
cd hallucination-as-a-service
```

### Option A: Docker/Podman (recommended)

Requires [Docker](https://docs.docker.com/get-docker/) or [Podman](https://podman.io/). pnpm is installed inside the image, so you don't need it on your machine.

```bash
docker build -t haas .
docker run -p 3000:3000 haas
```

Change `docker` to `podman` if you are using Podman.

### Option B: Without Docker

Requires [Node.js](https://nodejs.org) 24+ and [pnpm](https://pnpm.io). Check that pnpm is installed:

```bash
pnpm --version
```

If it's missing, [install it](https://pnpm.io).

Then install the dependencies and start the server:

```bash
pnpm install
pnpm start
```

The API will be live at:
```
http://localhost:3000/hallucination
```

You can also change the port using an environment variable:
```bash
PORT=5000 pnpm start
```

### Behind a reverse proxy

The app trusts one proxy (`trust proxy` is `1`) so the rate limit uses the real client IP. If you run it behind more than one proxy, adjust that value in `index.ts`.

## ❤️ Do you like my work?

If you find the project useful, you can support the author here:

[![GitHub Sponsor](https://img.shields.io/badge/Sponsor_on_GitHub-30363D?logo=github&style=for-the-badge)](https://github.com/sponsors/antoniorodr)

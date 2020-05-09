import getServer from "src/server";
import logger from "@shared/logger";

// Start the server
const port = Number(process.env.PORT || 3000);
(async () => {
  const app = await getServer();
  app.listen(port, () => {
    logger.info("Express server started on port: " + port);
  });
})();

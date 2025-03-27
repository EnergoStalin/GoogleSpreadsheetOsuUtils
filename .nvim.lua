local overseer = require("overseer")

overseer.register_template({
  name = "dev",
  builder = function()
    return {
      name = "dev",
      strategy = {
        "orchestrator",
        tasks = {
          {
            { cmd = { "pnpm", "exec", "tsc", "--watch" } },
            { cmd = { "pnpm", "exec", "clasp", "push", "-w" } },
          }
        }
      }
    }
  end
})
